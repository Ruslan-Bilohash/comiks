using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Мінімальний світ: плоска земля, світло, гравець і камера від третьої особи.
    /// Працює у будь-якій сцені: натисни Play — усе з'явиться саме.
    /// </summary>
    public sealed class WorldBuilder : MonoBehaviour
    {
        public float groundSize = 400f;

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

            CreateGround();
            CreateLight();
            Camera cam = SetupCamera();
            SpawnPlayer(cam);
        }

        void CreateGround()
        {
            // Стандартний Plane — 10×10 м при масштабі 1.
            var ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
            ground.name = "Ground";
            ground.transform.SetParent(transform, false);
            ground.transform.localScale = new Vector3(groundSize / 10f, 1f, groundSize / 10f);
            ground.GetComponent<MeshRenderer>().sharedMaterial = MaterialFactory.Lit(new Color(0.35f, 0.6f, 0.3f), 0.05f);
        }

        void CreateLight()
        {
            var go = new GameObject("Sun");
            go.transform.SetParent(transform, false);
            go.transform.rotation = Quaternion.Euler(50f, -30f, 0f);
            var light = go.AddComponent<Light>();
            light.type = LightType.Directional;
            light.shadows = LightShadows.Soft;
            light.intensity = 1.1f;

            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.55f, 0.6f, 0.7f);
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
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.55f, 0.75f, 0.95f);
            cam.nearClipPlane = 0.2f;
            cam.farClipPlane = 1000f;
            cam.fieldOfView = 65f;
            return cam;
        }

        void SpawnPlayer(Camera cam)
        {
            var go = new GameObject("Player");
            go.transform.SetParent(transform, false);
            go.transform.position = new Vector3(0f, 0.1f, 0f);

            var cc = go.AddComponent<CharacterController>();
            cc.height = 1.8f;
            cc.radius = 0.35f;
            cc.center = new Vector3(0f, 0.9f, 0f);
            cc.stepOffset = 0.4f;

            var body = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            body.name = "Body";
            body.transform.SetParent(go.transform, false);
            body.transform.localPosition = new Vector3(0f, 0.9f, 0f);
            body.transform.localScale = new Vector3(0.7f, 0.9f, 0.7f);
            Destroy(body.GetComponent<Collider>());
            body.GetComponent<MeshRenderer>().sharedMaterial = MaterialFactory.Lit(new Color(0.2f, 0.45f, 0.75f), 0.2f);

            // Шар Ignore Raycast: камера не «бачить» гравця.
            foreach (Transform t in go.GetComponentsInChildren<Transform>()) t.gameObject.layer = 2;

            var controller = go.AddComponent<ThirdPersonController>();
            controller.visual = body.transform;
            controller.cameraTransform = cam.transform;

            var orbit = cam.GetComponent<OrbitCamera>();
            if (orbit == null) orbit = cam.gameObject.AddComponent<OrbitCamera>();
            orbit.target = go.transform;
        }

        void OnGUI()
        {
            if (hudStyle == null)
            {
                hudStyle = new GUIStyle(GUI.skin.label) { fontSize = 16 };
                hudStyle.normal.textColor = Color.white;
            }
            GUI.Label(new Rect(14, 10, 900, 28),
                "WASD — рух   Shift — біг   Space — стрибок   Миша — камера   Колесо — зум   Esc — курсор",
                hudStyle);
        }
    }
}
