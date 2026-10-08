using UnityEngine;

namespace Comiks.World
{
    /// <summary>Будує Unity Terrain з HeightField і розмальовує його: пісок, трава, скеля, сніг.</summary>
    public static class TerrainFactory
    {
        public static Terrain Create(Transform parent, HeightField field, float size, float height, int heightmapRes)
        {
            var data = new TerrainData();
            data.heightmapResolution = heightmapRes;
            data.size = new Vector3(size, height, size);

            var heights = new float[heightmapRes, heightmapRes];
            for (int z = 0; z < heightmapRes; z++)
            {
                for (int x = 0; x < heightmapRes; x++)
                {
                    heights[z, x] = field.Sample(x / (heightmapRes - 1f), z / (heightmapRes - 1f));
                }
            }
            data.SetHeights(0, 0, heights);

            data.terrainLayers = BuildLayers();
            Paint(data, height);

            var go = Terrain.CreateTerrainGameObject(data);
            go.name = "Terrain";
            go.transform.SetParent(parent, false);
            go.transform.position = new Vector3(-size * 0.5f, 0f, -size * 0.5f);

            var terrain = go.GetComponent<Terrain>();
            terrain.heightmapPixelError = 4f;
            terrain.basemapDistance = 600f;
            terrain.drawInstanced = true;

            var terrainShader = Shader.Find("Universal Render Pipeline/Terrain/Lit");
            if (terrainShader != null) terrain.materialTemplate = new Material(terrainShader);

            return terrain;
        }

        static TerrainLayer[] BuildLayers()
        {
            return new[]
            {
                Layer(TextureFactory.Tileable(256, new Color(0.76f, 0.68f, 0.48f), new Color(0.90f, 0.84f, 0.64f), 16, 4, 11), 8f),  // пісок
                Layer(TextureFactory.Tileable(256, new Color(0.16f, 0.31f, 0.09f), new Color(0.34f, 0.52f, 0.18f), 8, 5, 23), 10f),  // трава
                Layer(TextureFactory.Tileable(256, new Color(0.28f, 0.28f, 0.31f), new Color(0.52f, 0.49f, 0.46f), 6, 5, 37, 1.6f), 14f), // скеля
                Layer(TextureFactory.Tileable(256, new Color(0.80f, 0.85f, 0.92f), new Color(0.98f, 0.99f, 1.00f), 8, 3, 41), 10f),  // сніг
            };
        }

        static TerrainLayer Layer(Texture2D diffuse, float tile)
        {
            var layer = new TerrainLayer();
            layer.diffuseTexture = diffuse;
            layer.tileSize = new Vector2(tile, tile);
            layer.smoothness = 0f;
            layer.metallic = 0f;
            return layer;
        }

        static void Paint(TerrainData data, float height)
        {
            int res = 512;
            data.alphamapResolution = res;
            var maps = new float[res, res, 4];

            for (int y = 0; y < res; y++)
            {
                for (int x = 0; x < res; x++)
                {
                    float u = x / (res - 1f);
                    float v = y / (res - 1f);
                    float h01 = data.GetInterpolatedHeight(u, v) / height;
                    float slope = data.GetSteepness(u, v);

                    float rock = HeightField.Smooth(28f, 42f, slope);
                    float snow = HeightField.Smooth(0.58f, 0.68f, h01) * (1f - rock * 0.7f);
                    float sand = (1f - HeightField.Smooth(HeightField.SeaLevel + 0.008f, HeightField.SeaLevel + 0.03f, h01)) * (1f - rock);
                    float grass = Mathf.Max(0f, 1f - rock - snow - sand);

                    float sum = sand + grass + rock + snow;
                    if (sum < 0.0001f) { grass = 1f; sum = 1f; }
                    maps[y, x, 0] = sand / sum;
                    maps[y, x, 1] = grass / sum;
                    maps[y, x, 2] = rock / sum;
                    maps[y, x, 3] = snow / sum;
                }
            }
            data.SetAlphamaps(0, 0, maps);
        }
    }
}
