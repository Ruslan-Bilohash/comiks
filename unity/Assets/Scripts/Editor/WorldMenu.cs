using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace Comiks.World.Editor
{
    static class WorldMenu
    {
        const string ScenePath = "Assets/Scenes/World.unity";

        /// <summary>Створює сцену Assets/Scenes/World.unity з одним об'єктом WorldBuilder.</summary>
        [MenuItem("Comiks/Створити сцену світу")]
        static void CreateScene()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;

            if (!AssetDatabase.IsValidFolder("Assets/Scenes")) AssetDatabase.CreateFolder("Assets", "Scenes");

            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            var cam = new GameObject("Main Camera") { tag = "MainCamera" };
            cam.AddComponent<Camera>();
            cam.AddComponent<AudioListener>();
            cam.transform.position = new Vector3(0f, 40f, -60f);

            new GameObject("World").AddComponent<WorldBuilder>();

            EditorSceneManager.SaveScene(scene, ScenePath);
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
            Debug.Log("[Comiks] Сцену створено: " + ScenePath + ". Натисни Play.");
        }
    }
}
