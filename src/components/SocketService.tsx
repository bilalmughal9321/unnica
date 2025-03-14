import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';

class SocketService {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(value: string, onMessage: (data: any) => void) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened.');

      const payload = {
        action: 'OPEN_AU_DOOR',
        data: '1JqmHZeCjywJf4xlKrLmdDYshnNaOspmsEMWchesB8fp2bdxq5yOf8WKPNZf8R0A',
      };

      // console.log('response: ', JSON.stringify(payload));
      this.sendMessage(payload);
    };

    this.socket.onmessage = message => {
      // Toast.show(`response: ${message.data}`, Toast.LONG);

      // console.log('response: ', message.data);
      // const data = JSON.parse(message);
      onMessage(message.data);
    };

    this.socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  }

  sendMessage(message: object) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message); // Only stringify the object
      console.log('Sending payload:', jsonMessage);
      this.socket.send(jsonMessage); // Send the stringified message
    } else {
      console.error('WebSocket is not open.');
    }
  }

  close() {
    console.log('aa');
    if (this.socket) {
      console.log('bb');
      this.socket.close();
      this.socket = null;
    }
  }
}

export default SocketService;
