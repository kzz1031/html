import mitt from 'mitt';

type Events = {
  sayHello: string;
};

const emitter = mitt<Events>();

export default emitter;