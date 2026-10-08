using System.Collections.Generic;
using UnityEngine;

namespace Comiks.World
{
    /// <summary>
    /// Ліс (ялини й берези) і каміння. Дерева клеяться в чанки по 100×100 м — це кілька десятків
    /// драйкол замість тисяч GameObject-ів. Кожне дерево має капсульний колайдер на стовбурі.
    /// </summary>
    public static class VegetationFactory
    {
        sealed class TreeTemplate
        {
            public Vector3[] verts;
            public Vector3[] normals;
            public int[] trunk;
            public int[] leaf;
        }

        sealed class Chunk
        {
            public readonly List<Vector3> v = new List<Vector3>();
            public readonly List<Vector3> n = new List<Vector3>();
            public readonly List<int> trunk = new List<int>();
            public readonly List<int>[] leaf = { new List<int>(), new List<int>(), new List<int>() };
            public readonly List<(Vector3 pos, float scale)> trunks = new List<(Vector3, float)>();

            public void Add(TreeTemplate tpl, Matrix4x4 m, int variant)
            {
                int off = v.Count;
                Quaternion q = m.rotation;
                for (int i = 0; i < tpl.verts.Length; i++)
                {
                    v.Add(m.MultiplyPoint3x4(tpl.verts[i]));
                    n.Add(q * tpl.normals[i]);
                }
                foreach (int i in tpl.trunk) trunk.Add(off + i);
                foreach (int i in tpl.leaf) leaf[variant].Add(off + i);
            }
        }

        sealed class Kind
        {
            public TreeTemplate template;
            public Material trunkMat;
            public Material[] leafMats;
        }

        static TreeTemplate BuildTemplate(System.Action<List<Vector3>, List<int>, List<int>> fn)
        {
            var v = new List<Vector3>();
            var trunk = new List<int>();
            var leaf = new List<int>();
            fn(v, trunk, leaf);

            var m = new Mesh();
            m.SetVertices(v);
            m.subMeshCount = 2;
            m.SetTriangles(trunk, 0);
            m.SetTriangles(leaf, 1);
            m.RecalculateNormals();
            var tpl = new TreeTemplate { verts = v.ToArray(), normals = m.normals, trunk = trunk.ToArray(), leaf = leaf.ToArray() };
            Object.Destroy(m);
            return tpl;
        }

        static TreeTemplate Spruce()
        {
            return BuildTemplate((v, trunk, leaf) =>
            {
                MeshKit.Frustum(v, trunk, Vector3.zero, 0.28f, 0.18f, 2.0f, 6, false);
                MeshKit.Frustum(v, leaf, new Vector3(0f, 1.2f, 0f), 2.0f, 0f, 2.8f, 8, true);
                MeshKit.Frustum(v, leaf, new Vector3(0f, 2.8f, 0f), 1.5f, 0f, 2.4f, 8, true);
                MeshKit.Frustum(v, leaf, new Vector3(0f, 4.2f, 0f), 1.0f, 0f, 2.2f, 8, true);
            });
        }

        static TreeTemplate Birch()
        {
            return BuildTemplate((v, trunk, leaf) =>
            {
                MeshKit.Frustum(v, trunk, Vector3.zero, 0.2f, 0.12f, 3.6f, 6, false);
                MeshKit.Frustum(v, leaf, new Vector3(0f, 2.6f, 0f), 0.6f, 1.9f, 1.4f, 8, true);
                MeshKit.Frustum(v, leaf, new Vector3(0f, 4.0f, 0f), 1.9f, 0f, 1.9f, 8, false);
            });
        }

        public static void PopulateTrees(Transform parent, Terrain terrain, float seaY, int seed, int count, float clearRadius)
        {
            TerrainData data = terrain.terrainData;
            Vector3 origin = terrain.transform.position;
            float size = data.size.x;
            float hMax = data.size.y;
            var rng = new System.Random(seed + 7);

            var kinds = new[]
            {
                new Kind
                {
                    template = Spruce(),
                    trunkMat = MaterialFactory.Lit(new Color(0.28f, 0.19f, 0.12f), 0.05f),
                    leafMats = new[]
                    {
                        MaterialFactory.Lit(new Color(0.08f, 0.25f, 0.14f), 0.08f),
                        MaterialFactory.Lit(new Color(0.10f, 0.30f, 0.16f), 0.08f),
                        MaterialFactory.Lit(new Color(0.06f, 0.21f, 0.13f), 0.08f),
                    }
                },
                new Kind
                {
                    template = Birch(),
                    trunkMat = MaterialFactory.Lit(new Color(0.85f, 0.84f, 0.78f), 0.1f),
                    leafMats = new[]
                    {
                        MaterialFactory.Lit(new Color(0.45f, 0.62f, 0.18f), 0.08f),
                        MaterialFactory.Lit(new Color(0.55f, 0.68f, 0.20f), 0.08f),
                        MaterialFactory.Lit(new Color(0.78f, 0.62f, 0.18f), 0.08f), // осінній жовтий
                    }
                },
            };

            const float cell = 100f;
            var chunks = new Dictionary<(int kind, int cx, int cz), Chunk>();
            int placed = 0, attempts = 0;

            while (placed < count && attempts < count * 12)
            {
                attempts++;
                float u = (float)rng.NextDouble();
                float v = (float)rng.NextDouble();
                float wx = origin.x + u * size;
                float wz = origin.z + v * size;
                if (wx * wx + wz * wz < clearRadius * clearRadius) continue;

                float y = terrain.SampleHeight(new Vector3(wx, 0f, wz)) + origin.y;
                float h01 = (y - origin.y) / hMax;
                if (y < seaY + 1.3f || h01 > 0.52f) continue;
                if (data.GetSteepness(u, v) > 32f) continue;

                float forest = Mathf.PerlinNoise(u * 7f + seed * 0.37f, v * 7f + seed * 0.11f);
                float chance = HeightField.Smooth(0.35f, 0.65f, forest);
                chance *= 1f - HeightField.Smooth(0.35f, 0.52f, h01) * 0.7f;
                if (rng.NextDouble() > chance) continue;

                int kindIndex = (h01 < 0.33f && rng.NextDouble() < 0.28) ? 1 : 0;
                float scale = 0.8f + (float)rng.NextDouble() * 0.7f;
                float yaw = (float)rng.NextDouble() * 360f;
                var rot = Quaternion.Euler((float)(rng.NextDouble() - 0.5) * 6f, yaw, (float)(rng.NextDouble() - 0.5) * 6f);
                var pos = new Vector3(wx, y - 0.1f, wz);

                var key = (kindIndex, Mathf.FloorToInt((wx - origin.x) / cell), Mathf.FloorToInt((wz - origin.z) / cell));
                if (!chunks.TryGetValue(key, out Chunk chunk))
                {
                    chunk = new Chunk();
                    chunks[key] = chunk;
                }
                chunk.Add(kinds[kindIndex].template, Matrix4x4.TRS(pos, rot, Vector3.one * scale), rng.Next(3));
                chunk.trunks.Add((pos, scale));
                placed++;
            }

            var holder = new GameObject("Forest");
            holder.transform.SetParent(parent, false);

            foreach (var pair in chunks)
            {
                Kind kind = kinds[pair.Key.kind];
                Chunk c = pair.Value;

                var mesh = new Mesh { name = "TreeChunk" };
                if (c.v.Count > 65000) mesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
                mesh.SetVertices(c.v);
                mesh.SetNormals(c.n);
                mesh.subMeshCount = 4;
                mesh.SetTriangles(c.trunk, 0);
                mesh.SetTriangles(c.leaf[0], 1);
                mesh.SetTriangles(c.leaf[1], 2);
                mesh.SetTriangles(c.leaf[2], 3);
                mesh.RecalculateBounds();

                var go = new GameObject($"Trees_{pair.Key.kind}_{pair.Key.cx}_{pair.Key.cz}");
                go.transform.SetParent(holder.transform, false);
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var mr = go.AddComponent<MeshRenderer>();
                mr.sharedMaterials = new[] { kind.trunkMat, kind.leafMats[0], kind.leafMats[1], kind.leafMats[2] };

                foreach (var (pos, scale) in c.trunks)
                {
                    var cap = go.AddComponent<CapsuleCollider>();
                    cap.center = pos + Vector3.up * (1.6f * scale);
                    cap.radius = 0.35f * scale;
                    cap.height = 3.2f * scale;
                }
            }
        }

        public static void PopulateRocks(Transform parent, Terrain terrain, float seaY, int seed, int count, float clearRadius)
        {
            TerrainData data = terrain.terrainData;
            Vector3 origin = terrain.transform.position;
            float size = data.size.x;
            var rng = new System.Random(seed + 99);

            var variants = new Mesh[3];
            for (int i = 0; i < variants.Length; i++) variants[i] = RockMesh(seed + i * 31);
            var mat = MaterialFactory.Lit(new Color(0.40f, 0.40f, 0.42f), 0.15f);

            var holder = new GameObject("Rocks");
            holder.transform.SetParent(parent, false);

            int placed = 0, attempts = 0;
            while (placed < count && attempts < count * 10)
            {
                attempts++;
                float u = (float)rng.NextDouble();
                float v = (float)rng.NextDouble();
                float wx = origin.x + u * size;
                float wz = origin.z + v * size;
                if (wx * wx + wz * wz < clearRadius * clearRadius) continue;

                float y = terrain.SampleHeight(new Vector3(wx, 0f, wz)) + origin.y;
                if (y < seaY - 0.5f) continue;

                float scale = 0.6f + (float)Mathf.Pow((float)rng.NextDouble(), 2.2f) * 3.4f;
                var go = new GameObject("Rock");
                go.transform.SetParent(holder.transform, false);
                go.transform.position = new Vector3(wx, y - scale * 0.25f, wz);
                go.transform.rotation = Quaternion.Euler(0f, (float)rng.NextDouble() * 360f, 0f);
                go.transform.localScale = new Vector3(scale, scale * (0.6f + (float)rng.NextDouble() * 0.5f), scale);

                var mesh = variants[rng.Next(variants.Length)];
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                go.AddComponent<MeshRenderer>().sharedMaterial = mat;
                go.AddComponent<MeshCollider>().sharedMesh = mesh;
                placed++;
            }
        }

        static Mesh RockMesh(int seed)
        {
            var sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            Mesh src = sphere.GetComponent<MeshFilter>().sharedMesh;
            Object.Destroy(sphere);

            Vector3[] verts = src.vertices;
            for (int i = 0; i < verts.Length; i++)
            {
                Vector3 p = verts[i];
                float n = Mathf.PerlinNoise(p.x * 3f + seed, p.y * 3f + p.z * 2f + seed * 0.5f);
                verts[i] = p * (0.7f + n * 0.7f);
            }

            var mesh = new Mesh { name = "Rock" };
            mesh.vertices = verts;
            mesh.triangles = src.triangles;
            mesh.RecalculateNormals();
            mesh.RecalculateBounds();
            return mesh;
        }
    }
}
