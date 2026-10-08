using UnityEngine;

namespace Comiks.World
{
    /// <summary>Велика напівпрозора площина моря з повільно «пливучою» текстурою брижів.</summary>
    public sealed class WaterSurface : MonoBehaviour
    {
        public Vector2 flow = new Vector2(0.012f, 0.007f);
        Material mat;
        Vector2 offset;

        public static WaterSurface Create(Transform parent, float y, float extent)
        {
            var go = new GameObject("Water");
            go.transform.SetParent(parent, false);
            go.transform.position = new Vector3(0f, y, 0f);

            const float tile = 14f;
            float uv = extent * 2f / tile;
            var mesh = new Mesh { name = "WaterQuad" };
            mesh.vertices = new[]
            {
                new Vector3(-extent, 0f, -extent), new Vector3(-extent, 0f, extent),
                new Vector3(extent, 0f, extent), new Vector3(extent, 0f, -extent),
            };
            mesh.uv = new[] { new Vector2(0, 0), new Vector2(0, uv), new Vector2(uv, uv), new Vector2(uv, 0) };
            mesh.triangles = new[] { 0, 1, 2, 0, 2, 3 };
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();

            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var mr = go.AddComponent<MeshRenderer>();
            mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;

            var ripples = TextureFactory.Tileable(256, new Color(0.70f, 0.86f, 0.95f), Color.white, 12, 4, 77, 1.1f);
            var water = go.AddComponent<WaterSurface>();
            water.mat = MaterialFactory.Transparent(new Color(0.07f, 0.36f, 0.48f, 0.80f), 0.95f);
            MaterialFactory.SetTexture(water.mat, ripples);
            mr.sharedMaterial = water.mat;
            return water;
        }

        void Update()
        {
            offset += flow * Time.deltaTime;
            offset.x %= 1f;
            offset.y %= 1f;
            if (mat.HasProperty("_BaseMap")) mat.SetTextureOffset("_BaseMap", offset);
            if (mat.HasProperty("_MainTex")) mat.SetTextureOffset("_MainTex", offset);
        }
    }
}
