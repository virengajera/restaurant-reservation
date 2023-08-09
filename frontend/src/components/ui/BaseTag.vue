<template>
    <p class="pill">
        <slot></slot>
    </p>
</template>

<style scoped>
.pill {
    margin: 0.2rem 1rem;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    background-color: coral;
    color: white;
    display: inline-block;
    font-weight: bold;
}
</style>