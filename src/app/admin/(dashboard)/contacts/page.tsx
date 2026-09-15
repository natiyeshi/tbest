import { ContactsInbox } from "@/components/admin/contacts-inbox";
import { getContacts } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";

export default async function AdminContactsPage() {
  await requireAdmin();
  const contacts = await getContacts();
  return <ContactsInbox contacts={contacts} />;
}
