import type { ReactNode } from 'react';

import AdminShell from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/admin/auth';

const ProtectedAdminLayout = async ({ children }: { children: ReactNode }) => {
    await requireAdmin();
    return <AdminShell>{children}</AdminShell>;
};

export default ProtectedAdminLayout;

