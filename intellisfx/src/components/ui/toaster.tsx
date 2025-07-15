import { useUIStore } from '@/stores/ui';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';

export function Toaster() {
  const { toast, setToast } = useUIStore();

  if (!toast) return null;

  return (
    <ToastProvider>
      <Toast
        open={!!toast}
        onOpenChange={() => setToast(null)}
        variant={toast.type === 'error' ? 'destructive' : 'default'}
      >
        {toast.message}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
