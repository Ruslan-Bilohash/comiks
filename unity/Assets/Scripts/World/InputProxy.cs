using UnityEngine;
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
using UnityEngine.InputSystem;
#endif

namespace Comiks.World
{
    /// <summary>
    /// Єдина точка входу для вводу. Працює і зі старим Input Manager, і з новим Input System.
    /// </summary>
    public static class InputProxy
    {
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
        public static Vector2 Move()
        {
            var k = Keyboard.current;
            if (k == null) return Vector2.zero;
            float x = (k.dKey.isPressed || k.rightArrowKey.isPressed ? 1f : 0f)
                    - (k.aKey.isPressed || k.leftArrowKey.isPressed ? 1f : 0f);
            float y = (k.wKey.isPressed || k.upArrowKey.isPressed ? 1f : 0f)
                    - (k.sKey.isPressed || k.downArrowKey.isPressed ? 1f : 0f);
            return new Vector2(x, y);
        }

        public static Vector2 Look() => Mouse.current != null ? Mouse.current.delta.ReadValue() * 0.05f : Vector2.zero;
        public static float Scroll() => Mouse.current != null ? Mouse.current.scroll.ReadValue().y * 0.001f : 0f;
        public static bool JumpPressed() => Keyboard.current != null && Keyboard.current.spaceKey.wasPressedThisFrame;
        public static bool SprintHeld() => Keyboard.current != null && Keyboard.current.leftShiftKey.isPressed;
        public static bool FastTimeHeld() => Keyboard.current != null && Keyboard.current.tKey.isPressed;
        public static bool EscapePressed() => Keyboard.current != null && Keyboard.current.escapeKey.wasPressedThisFrame;
        public static bool ClickPressed() => Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame;
#else
        public static Vector2 Move() => new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
        public static Vector2 Look() => new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));
        public static float Scroll() => Input.GetAxis("Mouse ScrollWheel");
        public static bool JumpPressed() => Input.GetKeyDown(KeyCode.Space);
        public static bool SprintHeld() => Input.GetKey(KeyCode.LeftShift);
        public static bool FastTimeHeld() => Input.GetKey(KeyCode.T);
        public static bool EscapePressed() => Input.GetKeyDown(KeyCode.Escape);
        public static bool ClickPressed() => Input.GetMouseButtonDown(0);
#endif
    }
}
