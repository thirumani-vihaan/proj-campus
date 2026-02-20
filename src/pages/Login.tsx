export default function Login() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Must use a valid college email address.
                    </p>
                </div>
            </div>
        </div>
    )
}
