using UnityEngine;

namespace Comiks.World
{
    /// <summary>Камера від третьої особи: обертання мишею, колесо — зум, не заходить у стіни й землю.</summary>
    public sealed class OrbitCamera : MonoBehaviour
    {
        public Transform target;
        public Vector3 pivotOffset = new Vector3(0f, 1.6f, 0f);
        public float distance = 6.5f;
        public float minDistance = 2f;
        public float maxDistance = 16f;
        public float sensitivity = 2.2f;
        public float yaw = 20f;
        public float pitch = 14f;

        float currentDistance;

        public float Yaw => yaw;

        void Start()
        {
            currentDistance = distance;
            LockCursor(true);
        }

        static void LockCursor(bool locked)
        {
            Cursor.lockState = locked ? CursorLockMode.Locked : CursorLockMode.None;
            Cursor.visible = !locked;
        }

        void LateUpdate()
        {
            if (target == null) return;

            if (InputProxy.EscapePressed()) LockCursor(false);
            else if (Cursor.lockState != CursorLockMode.Locked && InputProxy.ClickPressed()) LockCursor(true);

            if (Cursor.lockState == CursorLockMode.Locked)
            {
                Vector2 look = InputProxy.Look();
                yaw += look.x * sensitivity;
                pitch = Mathf.Clamp(pitch - look.y * sensitivity, -20f, 70f);
                distance = Mathf.Clamp(distance - InputProxy.Scroll() * 8f, minDistance, maxDistance);
            }

            Vector3 pivot = target.position + pivotOffset;
            Quaternion rot = Quaternion.Euler(pitch, yaw, 0f);
            Vector3 dir = rot * Vector3.back;

            // Усе, крім шару Ignore Raycast (на ньому гравець), блокує камеру.
            int mask = ~(1 << 2);
            float wanted = distance;
            if (Physics.SphereCast(pivot, 0.25f, dir, out RaycastHit hit, distance, mask, QueryTriggerInteraction.Ignore))
            {
                wanted = Mathf.Max(0.6f, hit.distance);
            }

            currentDistance = wanted < currentDistance
                ? wanted
                : Mathf.Lerp(currentDistance, wanted, 1f - Mathf.Exp(-8f * Time.deltaTime));

            transform.SetPositionAndRotation(pivot + dir * currentDistance, rot);
        }
    }
}
