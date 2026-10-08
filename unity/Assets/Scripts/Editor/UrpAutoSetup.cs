using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Comiks.World.Editor
{
    /// <summary>
    /// Проєкт створено без Unity Hub, тому при першому відкритті сам налаштовуємо URP:
    /// створюємо URP-ассет, призначаємо його в Graphics/Quality і додаємо потрібні шейдери в білд.
    /// </summary>
    [InitializeOnLoad]
    static class UrpAutoSetup
    {
        const string SettingsDir = "Assets/Settings";

        static UrpAutoSetup()
        {
            EditorApplication.delayCall += Run;
        }

        [MenuItem("Comiks/Налаштувати URP")]
        static void Run()
        {
            try
            {
                if (GraphicsSettings.defaultRenderPipeline == null)
                {
                    CreateUrpAsset();
                }
                AddAlwaysIncludedShaders();
            }
            catch (System.Exception e)
            {
                Debug.LogWarning("[Comiks] Не вдалося налаштувати URP автоматично: " + e.Message +
                                 "\nСтвори вручну: Assets ▸ Create ▸ Rendering ▸ URP Asset (with Universal Renderer) " +
                                 "і призначи в Project Settings ▸ Graphics.");
            }
        }

        static void CreateUrpAsset()
        {
            if (!AssetDatabase.IsValidFolder(SettingsDir)) AssetDatabase.CreateFolder("Assets", "Settings");

            var rendererData = ScriptableObject.CreateInstance<UniversalRendererData>();
            AssetDatabase.CreateAsset(rendererData, SettingsDir + "/UniversalRenderer.asset");

            UniversalRenderPipelineAsset asset = UniversalRenderPipelineAsset.Create(rendererData);
            asset.shadowDistance = 150f;
            AssetDatabase.CreateAsset(asset, SettingsDir + "/UniversalRP.asset");

            GraphicsSettings.defaultRenderPipeline = asset;
            for (int i = 0; i < QualitySettings.names.Length; i++)
            {
                QualitySettings.SetQualityLevel(i, false);
                QualitySettings.renderPipeline = asset;
            }

            AssetDatabase.SaveAssets();
            Debug.Log("[Comiks] URP налаштовано: " + SettingsDir + "/UniversalRP.asset");
        }

        // Шейдери, які шукаємо через Shader.Find у коді, інакше білд їх відкине.
        static void AddAlwaysIncludedShaders()
        {
            string[] names =
            {
                "Universal Render Pipeline/Lit",
                "Universal Render Pipeline/Terrain/Lit",
                "Skybox/Procedural",
            };

            var gs = AssetDatabase.LoadAssetAtPath<GraphicsSettings>("ProjectSettings/GraphicsSettings.asset");
            if (gs == null) return;

            var so = new SerializedObject(gs);
            SerializedProperty list = so.FindProperty("m_AlwaysIncludedShaders");
            if (list == null) return;

            bool changed = false;
            foreach (string shaderName in names)
            {
                Shader shader = Shader.Find(shaderName);
                if (shader == null) continue;

                bool present = false;
                for (int i = 0; i < list.arraySize; i++)
                {
                    if (list.GetArrayElementAtIndex(i).objectReferenceValue == shader) { present = true; break; }
                }
                if (present) continue;

                list.InsertArrayElementAtIndex(list.arraySize);
                list.GetArrayElementAtIndex(list.arraySize - 1).objectReferenceValue = shader;
                changed = true;
            }

            if (changed)
            {
                so.ApplyModifiedPropertiesWithoutUndo();
                AssetDatabase.SaveAssets();
            }
        }
    }
}
