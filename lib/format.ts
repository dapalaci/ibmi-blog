import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(iso: string): string {
  return format(new Date(iso), "d MMM yyyy", { locale: es });
}
