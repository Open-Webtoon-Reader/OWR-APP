<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {useToast} from "~/components/ui/toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

definePageMeta({
    middleware: "apiurl-middleware",
    layout: "nav-layout"
});
useSeoMeta({
    title: "OWR | Settings",
    description: "Settings page",
});

const router = useRouter();

function clearApiUrl(){
    localStorage.removeItem("apiurl");
    router.push("/");
}

function clearUserData(){
    localStorage.removeItem("order");
    localStorage.removeItem("episode");
    localStorage.removeItem("progression");

    const {toast: toaster} = useToast();
    toaster({
        title: "User data cleared!",
        description: "All user data has been cleared successfully.",
        variant: "success",
    });
}
</script>

<template>
    <div class="flex flex-1 justify-center items-center text-center">
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Manage your settings here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Separator/>
                <h4>Data</h4>
                <div class="flex flex-col gap-2 pt-4">
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="destructive">Clear server URL</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Clear server URL</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to clear the server URL? This will reset the server URL to the default value.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button variant="secondary">No</Button>
                                </DialogClose>
                                <Button variant="destructive" @click="clearApiUrl">Yes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="destructive">Clear user data</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Clear user data</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to clear all user data? This will reset all user data to the default values.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button variant="secondary">No</Button>
                                </DialogClose>
                                <DialogClose as-child>
                                    <Button variant="destructive" @click="clearUserData">Yes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<style scoped>

</style>
