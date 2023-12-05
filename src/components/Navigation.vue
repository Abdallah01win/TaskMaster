<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="flex items-center justify-between py-2 bg-red-600 h-16">
        <div>TodoApp</div>
    </nav>
    <main class="flex height">
        <aside class="bg-red-600">
            <ul>
                <li>tab</li>
                <li>tab</li>
                <li>tab</li>
                <li>tab</li>
                <li>tab</li>
            </ul>
        </aside>
        <slot name="tab"></slot>
    </main>
</template>

<style scoped>
.height {
    --nav-height: 64px;
    --main-height: calc(100vh - var(--nav-height));
    height: var(--main-height);
}
</style>