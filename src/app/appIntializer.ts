import { ClientIdService } from "./services/client-id-service.service";

export function appInitializer(clientIdService:ClientIdService): () => Promise<void> {
    return () => {
      return new Promise<void>((resolve) => {
        console.log('test')
        clientIdService.fetchClients().subscribe(
          (clients:any) => {
            clientIdService.handleClientId(clients);
            resolve();
          },
          (error:any) => {
            clientIdService.handleClientId('');
            resolve();
          }
        );
      });
    };
  }
  