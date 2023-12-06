<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="px-4 flex items-center justify-between py-2 bg-dark-100 h-[var(--nav-height)]">
        <div>TodoApp</div>
    </nav>
    <section class="flex h-[var(--main-height)] w-full">
        <aside class="bg-dark-100 w-52">
            <ul>
                <li class="py-2 px-4 border-b border-gray-100/30 hover:bg-dark-200">tab</li>
                <li class="py-2 px-4 border-b border-gray-100/30 hover:bg-dark-200">tab</li>
                <li class="py-2 px-4 border-b border-gray-100/30 hover:bg-dark-200">tab</li>
                <li class="py-2 px-4 border-b border-gray-100/30 hover:bg-dark-200">tab</li>
            </ul>
        </aside>

        <div class="flex-1 p-8">
            <slot name="tab"></slot>
        </div>
    </section>
</template>