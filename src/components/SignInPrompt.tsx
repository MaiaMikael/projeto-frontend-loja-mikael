import { useStore } from "@/lib/store";

export function SignInPrompt({ message }: { message: string }) {
  const { signIn } = useStore();
  return (
    <div className="mx-auto max-w-md rounded-lg bg-background p-8 text-center">
      <p className="text-dark-gray-2">{message}</p>
      <button type="button" onClick={signIn} className="mt-6 inline-flex h-11 items-center rounded-sm bg-rubi px-8 text-sm font-bold text-primary-foreground hover:bg-rubi-deep">
        Cadastre-se
      </button>
    </div>
  );
}
