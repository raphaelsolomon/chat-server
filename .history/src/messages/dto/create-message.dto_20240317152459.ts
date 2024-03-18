export class CreateMessageDto {
  readonly uuid: string;

  readonly sender_uuid: string;

  readonly receiver_uuid: string;

  readonly content: string;
}
