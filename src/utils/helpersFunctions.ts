export function grant_editor_privileges(userId: string) {}

export function immediate_editor_privileges_notification() {}

export function compress_media(mediaId: string) {}

export function decompress_media(mediaId: string) {}

export function validate_email(email: string): boolean {
  const baseYear = 2012;
  const currentYear = new Date().getFullYear();
  const regex = /^(\d{4})(\d{4})@isptec\.co\.ao$/;
  const match = email.match(regex)!;

  if (!match) {
    return false;
  }

  const registrationYear = parseInt(match[1], 10);
  if (registrationYear < baseYear || registrationYear > currentYear) {
    return false;
  }

  return true;
}

export const replacer = (key: string, value: any): any => {
  return typeof value === "bigint" ? value.toString() : value;
};
