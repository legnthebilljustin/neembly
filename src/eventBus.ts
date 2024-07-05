import { reactive } from "vue";

type EventBus = {
    events: Record<string, ((data?: any) => void)[]>;
    emit(event: string, data?: any): void;
    on(event: string, callback: (data?: any) => void): void;
}

const eventBus = reactive<EventBus>({
    events: {},
    emit(event: string, data?: any) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
    },
    on(event: string, callback: (data?: any) => void) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
});

export default eventBus;