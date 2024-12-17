"use client";

let ws = null;

export function setupWebSocket(cookieValue) {
  if (!cookieValue) {
    console.error("Cookie value is required to establish WebSocket");
    return;
  }

  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(`ws://localhost:8080/websocket/${cookieValue}`);

    ws.onopen = () => {
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
    };

    ws.onclose = () => {
      ws = null; // Reset WebSocket instance
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  } else {
  }
}

export function getWebSocket() {
  return ws;
}

export function closeWebSocket() {
  if (ws) {
    ws.close();
    ws = null;
  }
}
