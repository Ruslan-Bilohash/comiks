using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Comiks.World
{
    /// <summary>
    /// Збирає увесь світ у коді: острів із фйордом, море, ліс, каміння, село, день і ніч, гравця, камеру й постобробку.
    /// Працює у будь-якій сцені: натисни Play — світ з'явиться сам. Або додай цей компонент на порожній GameObject.
    /// </summary>
    public sealed class WorldBuilder : MonoBehaviour
    {
        [Header("Світ")]
        public int seed = 1337;
        public float worldSize = 1000f;
        public float worldHeight = 150f;
        public int heightmapResolution = 1025;

        [Header("Наповнення")]
        public int treeCount = 9000;
        public int rockCount = 250;

        DayNightCycle cycle;
        ThirdPersonController player;
        GUIStyle hudStyle;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void AutoStart()
        {
            if (FindFirstObjectByType<WorldBuilder>() != null) return;
            new GameObject("World").AddComponent<WorldBuilder>();
        }

        void Awake()
        {
            transform.position = Vector3.zero;
            transform.rotation = Quaternion.identity;
            Build();
        }

        void Build()
        {
            float seaY = HeightField.SeaLevel * worldHeight;

            var field = new HeightField(seed);
            Terrain terrain = TerrainFactory.Create(transform, field, worldSize, worldHeight, heightmapResolution);

            WaterSurface.Create(transform, seaY, worldSize * 3f);

            var cycleGo = new GameObject("DayNight");
            cycleGo.transform.SetParent(transform, false);
            cycle = cycleGo.AddComponent<DayNightCycle>();
            cycle.waterLevel = seaY;

            VegetationFactory.PopulateTrees(transform, terrain, seaY, seed, treeCount, 48f);
            VegetationFactory.PopulateRocks(transform, terrain, seaY, seed, rockCount, 40f);

            VillageFactory.Result village = VillageFactory.Create(transform, terrain, seed);
            cycle.windowMaterial = village.windowMaterial;

            Camera cam = SetupCamera();
            player = SpawnPlayer(terrain, seaY, cam);
            SetupPostProcessing(cam);
        }

        Camera SetupCamera()
        {
            Camera cam = Camera.main;
            if (cam == null)
            {
                var go = new GameObject("Main Camera") { tag = "MainCamera" };
                cam = go.AddComponent<Camera>();
                go.AddComponent<AudioListener>();
            }
            cam.clearFlags = CameraClearFlags.Skybox;
            cam.nearClipPlane = 0.2f;
            cam.farClipPlane = 1800f;
            cam.fieldOfView = 65f;
            return cam;
        }

        ThirdPersonController SpawnPlayer(Terrain terrain, float seaY, Camera cam)
        {
            var go = new GameObject("Player");
            go.transform.SetParent(transform, false);

            float x = 0f, z = -12f;
            float y = terrain.SampleHeight(new Vector3(x, 0f, z)) + terrain.transform.position.y;
            go.transform.position = new Vector3(x, y + 0.1f, z);

            var cc = go.AddComponent<CharacterController>();
            cc.height = 1.8f;
            cc.radius = 0.35f;
            cc.center = new Vector3(0f, 0.9f, 0f);
            cc.stepOffset = 0.4f;
            cc.slopeLimit = 55f;

            var body = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            body.name = "Body";
            body.transform.SetParent(go.transform, false);
            body.transform.localPosition = new Vector3(0f, 0.9f, 0f);
            body.transform.localScale = new Vector3(0.7f, 0.9f, 0.7f);
            Destroy(body.GetComponent<Collider>());
            body.GetComponent<MeshRenderer>().sharedMaterial = MaterialFactory.Lit(new Color(0.20f, 0.45f, 0.75f), 0.2f);

            var scarf = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            scarf.name = "Scarf";
            scarf.transform.SetParent(body.transform, false);
            scarf.transform.localPosition = new Vector3(0f, 0.62f, 0f);
            scarf.transform.localScale = new Vector3(1.08f, 0.1f, 1.08f);
            Destroy(scarf.GetComponent<Collider>());
            scarf.GetComponent<MeshRenderer>().sharedMaterial = MaterialFactory.Lit(new Color(0.85f, 0.12f, 0.12f), 0.1f);

            // Шар Ignore Raycast: камера не «бачить» гравця.
            foreach (Transform t in go.GetComponentsInChildren<Transform>()) t.gameObject.layer = 2;

            var controller = go.AddComponent<ThirdPersonController>();
            controller.visual = body.transform;
            controller.cameraTransform = cam.transform;
            controller.waterLevel = seaY;

            var orbit = cam.GetComponent<OrbitCamera>();
            if (orbit == null) orbit = cam.gameObject.AddComponent<OrbitCamera>();
            orbit.target = go.transform;
            return controller;
        }

        void SetupPostProcessing(Camera cam)
        {
            UniversalAdditionalCameraData data = cam.GetUniversalAdditionalCameraData();
            data.renderPostProcessing = true;
            data.antialiasing = AntialiasingMode.SubpixelMorphologicalAntiAliasing;

            var profile = ScriptableObject.CreateInstance<VolumeProfile>();

            var bloom = profile.Add<Bloom>(true);
            bloom.threshold.Override(1f);
            bloom.intensity.Override(0.7f);
            bloom.scatter.Override(0.65f);

            var tonemapping = profile.Add<Tonemapping>(true);
            tonemapping.mode.Override(TonemappingMode.ACES);

            var vignette = profile.Add<Vignette>(true);
            vignette.intensity.Override(0.22f);
            vignette.smoothness.Override(0.5f);

            var color = profile.Add<ColorAdjustments>(true);
            color.saturation.Override(14f);
            color.contrast.Override(8f);

            var go = new GameObject("PostFX");
            go.transform.SetParent(transform, false);
            var volume = go.AddComponent<Volume>();
            volume.isGlobal = true;
            volume.sharedProfile = profile;
        }

        void OnGUI()
        {
            if (hudStyle == null)
            {
                hudStyle = new GUIStyle(GUI.skin.label) { fontSize = 16 };
                hudStyle.normal.textColor = Color.white;
            }

            string status = player != null && player.InWater ? "  |  🌊 плаваєш" : "";
            GUI.Label(new Rect(14, 10, 900, 28), $"🕒 {cycle.Clock}{status}", hudStyle);
            GUI.Label(new Rect(14, 34, 900, 28),
                "WASD — рух   Shift — біг   Space — стрибок   Миша — камера   Колесо — зум   T (тримати) — час швидше   Esc — курсор",
                hudStyle);
        }
    }
}
