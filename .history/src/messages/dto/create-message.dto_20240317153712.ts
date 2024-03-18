export class CreateMessageDto {
  readonly sender_uuid: string;

  readonly receiver_uuid: string;

  readonly content: string;
}
