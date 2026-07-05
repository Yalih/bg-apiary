export class NetworkError extends Error {
  constructor(message = 'Nie można połączyć się z backendem BG Apiary.') {
    super(message);
    this.name = 'NetworkError';
  }
}
