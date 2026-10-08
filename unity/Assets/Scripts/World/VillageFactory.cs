using System.Collections.Generic;
using UnityEngine;

namespace Comiks.World
{
    /// <summary>Невелике норвезьке село навколо вогнища: кольорові будинки, дерниові дахи, вікна, що світяться вночі.</summary>
    public static class VillageFactory
    {
        public sealed class Result
        {
            public Material windowMaterial;
            public Transform root;
        }

        public static Result Create(Transform parent, Terrain terrain, int seed, int houseCount = 8)
        {
            var rng = new System.Random(seed + 5);
            var root = new GameObject("Village");
            root.transform.SetParent(parent, false);

            var result = new Result
            {
                root = root.transform,
                windowMaterial = MaterialFactory.Emissive(new Color(0.9f, 0.75f, 0.4f), Color.black),
            };

            var walls = new[]
            {
                MaterialFactory.Lit(new Color(0.55f, 0.12f, 0.10f), 0.05f),  // фалу-червоний
                MaterialFactory.Lit(new Color(0.80f, 0.60f, 0.20f), 0.05f),  // охра
                MaterialFactory.Lit(new Color(0.90f, 0.88f, 0.82f), 0.05f),  // білий
                MaterialFactory.Lit(new Color(0.25f, 0.45f, 0.55f), 0.05f),  // морська хвиля
                MaterialFactory.Lit(new Color(0.30f, 0.50f, 0.35f), 0.05f),  // зелений
            };
            var roofs = new[]
            {
                MaterialFactory.Lit(new Color(0.16f, 0.16f, 0.18f), 0.1f),   // шифер
                MaterialFactory.Lit(new Color(0.24f, 0.40f, 0.20f), 0.02f),  // дерновий дах
            };
            var wood = MaterialFactory.Lit(new Color(0.22f, 0.14f, 0.09f), 0.05f);
            var stone = MaterialFactory.Lit(new Color(0.42f, 0.42f, 0.44f), 0.1f);

            for (int i = 0; i < houseCount; i++)
            {
                float angle = (i / (float)houseCount) * Mathf.PI * 2f + (float)(rng.NextDouble() - 0.5) * 0.25f;
                float radius = 20f + (float)rng.NextDouble() * 6f;
                var pos = new Vector3(Mathf.Cos(angle) * radius, 0f, Mathf.Sin(angle) * radius);
                pos.y = terrain.SampleHeight(pos) + terrain.transform.position.y;

                float w = 6f + (float)rng.NextDouble() * 2f;
                float h = 3.5f + (float)rng.NextDouble() * 1f;
                float d = 5f + (float)rng.NextDouble() * 1f;

                Quaternion facing = Quaternion.LookRotation(new Vector3(-pos.x, 0f, -pos.z), Vector3.up);
                BuildHouse(root.transform, pos, facing, new Vector3(w, h, d),
                    walls[rng.Next(walls.Length)], roofs[rng.Next(roofs.Length)], result.windowMaterial, wood, stone);
            }

            BuildBonfire(root.transform, terrain, stone, wood);
            return result;
        }

        static GameObject Cube(Transform parent, string name, Vector3 localPos, Vector3 localScale, Material mat, bool collider)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            go.transform.SetParent(parent, false);
            go.transform.localPosition = localPos;
            go.transform.localScale = localScale;
            go.GetComponent<MeshRenderer>().sharedMaterial = mat;
            if (!collider) Object.Destroy(go.GetComponent<Collider>());
            return go;
        }

        static void BuildHouse(Transform parent, Vector3 pos, Quaternion rot, Vector3 size,
            Material wall, Material roof, Material window, Material wood, Material stone)
        {
            float w = size.x, h = size.y, d = size.z;
            var house = new GameObject("House");
            house.transform.SetParent(parent, false);
            house.transform.SetPositionAndRotation(pos, rot);

            Cube(house.transform, "Foundation", new Vector3(0f, 0.15f, 0f), new Vector3(w + 0.3f, 0.3f, d + 0.3f), stone, false);
            Cube(house.transform, "Walls", new Vector3(0f, h * 0.5f, 0f), size, wall, true);

            var roofGo = new GameObject("Roof");
            roofGo.transform.SetParent(house.transform, false);
            roofGo.transform.localPosition = new Vector3(0f, h, 0f);
            roofGo.AddComponent<MeshFilter>().sharedMesh = RoofMesh(w, d, 2.2f, 0.45f);
            roofGo.AddComponent<MeshRenderer>().sharedMaterial = roof;
            roofGo.AddComponent<MeshCollider>().sharedMesh = roofGo.GetComponent<MeshFilter>().sharedMesh;

            Cube(house.transform, "Chimney", new Vector3(w * 0.25f, h + 2.0f, -d * 0.15f), new Vector3(0.6f, 1.6f, 0.6f), stone, false);

            // Двері й вікна на «лицьовій» стороні (+Z — дивиться на вогнище).
            Cube(house.transform, "Door", new Vector3(0f, 1.0f, d * 0.5f + 0.03f), new Vector3(1.0f, 2.0f, 0.1f), wood, false);
            float wy = h * 0.58f;
            Cube(house.transform, "WindowL", new Vector3(-w * 0.3f, wy, d * 0.5f + 0.03f), new Vector3(0.9f, 0.9f, 0.1f), window, false);
            Cube(house.transform, "WindowR", new Vector3(w * 0.3f, wy, d * 0.5f + 0.03f), new Vector3(0.9f, 0.9f, 0.1f), window, false);
            Cube(house.transform, "WindowSideA", new Vector3(w * 0.5f + 0.03f, wy, 0f), new Vector3(0.1f, 0.9f, 0.9f), window, false);
            Cube(house.transform, "WindowSideB", new Vector3(-w * 0.5f - 0.03f, wy, 0f), new Vector3(0.1f, 0.9f, 0.9f), window, false);
        }

        /// <summary>Двосхилий дах: коник уздовж осі X, зі звисами.</summary>
        static Mesh RoofMesh(float w, float d, float rise, float overhang)
        {
            float hx = w * 0.5f + overhang;
            float hz = d * 0.5f + overhang;
            var v = new List<Vector3>();
            var t = new List<int>();

            var a = new Vector3(-hx, 0f, -hz);
            var b = new Vector3(-hx, 0f, hz);
            var c = new Vector3(hx, 0f, hz);
            var e = new Vector3(hx, 0f, -hz);
            var r0 = new Vector3(-hx, rise, 0f);
            var r1 = new Vector3(hx, rise, 0f);

            var front = new Vector3(0f, 1f, 1f);
            var back = new Vector3(0f, 1f, -1f);

            MeshKit.Tri(v, t, b, c, r1, front);
            MeshKit.Tri(v, t, b, r1, r0, front);
            MeshKit.Tri(v, t, a, e, r1, back);
            MeshKit.Tri(v, t, a, r1, r0, back);
            MeshKit.Tri(v, t, a, b, r0, Vector3.left);
            MeshKit.Tri(v, t, c, e, r1, Vector3.right);
            MeshKit.Tri(v, t, a, e, c, Vector3.down);
            MeshKit.Tri(v, t, a, c, b, Vector3.down);

            return MeshKit.Build(v, t);
        }

        static void BuildBonfire(Transform parent, Terrain terrain, Material stone, Material wood)
        {
            float y = terrain.SampleHeight(Vector3.zero) + terrain.transform.position.y;
            var fire = new GameObject("Bonfire");
            fire.transform.SetParent(parent, false);
            fire.transform.position = new Vector3(0f, y, 0f);

            for (int i = 0; i < 9; i++)
            {
                float a = i / 9f * Mathf.PI * 2f;
                var s = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                s.name = "Stone";
                s.transform.SetParent(fire.transform, false);
                s.transform.localPosition = new Vector3(Mathf.Cos(a) * 1.5f, 0.2f, Mathf.Sin(a) * 1.5f);
                s.transform.localScale = new Vector3(0.7f, 0.5f, 0.7f);
                s.GetComponent<MeshRenderer>().sharedMaterial = stone;
            }

            for (int i = 0; i < 6; i++)
            {
                float a = i / 6f * Mathf.PI * 2f;
                var log = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                log.name = "Log";
                log.transform.SetParent(fire.transform, false);
                log.transform.localPosition = new Vector3(Mathf.Cos(a) * 0.35f, 0.45f, Mathf.Sin(a) * 0.35f);
                log.transform.localRotation = Quaternion.Euler(0f, -a * Mathf.Rad2Deg, 0f) * Quaternion.Euler(0f, 0f, 70f);
                log.transform.localScale = new Vector3(0.18f, 0.7f, 0.18f);
                log.GetComponent<MeshRenderer>().sharedMaterial = wood;
                Object.Destroy(log.GetComponent<Collider>());
            }

            var flameMat = MaterialFactory.Emissive(new Color(1f, 0.5f, 0.1f), new Color(4.5f, 1.8f, 0.3f));
            var flame = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            flame.name = "Flame";
            flame.transform.SetParent(fire.transform, false);
            flame.transform.localPosition = new Vector3(0f, 0.9f, 0f);
            flame.transform.localScale = new Vector3(0.55f, 0.95f, 0.55f);
            flame.GetComponent<MeshRenderer>().sharedMaterial = flameMat;
            flame.GetComponent<MeshRenderer>().shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            Object.Destroy(flame.GetComponent<Collider>());

            var lightGo = new GameObject("FireLight");
            lightGo.transform.SetParent(fire.transform, false);
            lightGo.transform.localPosition = new Vector3(0f, 1.4f, 0f);
            var light = lightGo.AddComponent<Light>();
            light.type = LightType.Point;
            light.color = new Color(1f, 0.55f, 0.2f);
            light.range = 24f;
            light.intensity = 3f;
            light.shadows = LightShadows.None;
            lightGo.AddComponent<FireFlicker>().flame = flame.transform;
        }
    }

    /// <summary>Мерехтіння вогню: світло й полум'я трохи «дихають».</summary>
    public sealed class FireFlicker : MonoBehaviour
    {
        public Transform flame;
        Light fireLight;
        Vector3 baseScale;
        float seed;

        void Awake()
        {
            fireLight = GetComponent<Light>();
            seed = Random.value * 100f;
            if (flame != null) baseScale = flame.localScale;
        }

        void Update()
        {
            float n = Mathf.PerlinNoise(Time.time * 7f, seed);
            fireLight.intensity = 2.2f + n * 1.8f;
            if (flame == null) return;
            float s = 0.85f + n * 0.35f;
            flame.localScale = new Vector3(baseScale.x * s, baseScale.y * (0.8f + n * 0.5f), baseScale.z * s);
        }
    }
}
