import 'reflect-metadata'
import { Container, injectable } from 'inversify'

// 示例服务接口
export interface IMessageService {
  getMessage(): string
}

// 示例服务实现
@injectable()
export class MessageService implements IMessageService {
  getMessage(): string {
    return 'Hello from MessageService!'
  }
}

// 绑定服务
const container = new Container()
container.bind<IMessageService>('IMessageService').to(MessageService)

export { container } 