import { isPlatform } from '@ionic/vue';

export const createRedirectUri = (packageId: string, domain: string) : string => {
  const isNative: boolean = isPlatform("ios") || isPlatform("android");

  return isNative
    ? `${packageId}://${domain}/capacitor/${packageId}/callback`
    : window.location.origin;
}
