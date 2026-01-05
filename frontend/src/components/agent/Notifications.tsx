import { Bell, CheckCircle, AlertTriangle } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "info",
      message: "New case FDX-2026-009 has been assigned to you.",
      time: "5 mins ago",
    },
    {
      id: 2,
      type: "warning",
      message: "SLA deadline approaching for case FDX-2026-002.",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "success",
      message: "Payment received for case FDX-2026-003.",
      time: "Yesterday",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} />;
      case "warning":
        return <AlertTriangle size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                marginBottom: "8px",
              }}
            >
              <div>{getIcon(n.type)}</div>
              <div>
                <p style={{ margin: 0 }}>{n.message}</p>
                <small style={{ color: "#666" }}>{n.time}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
