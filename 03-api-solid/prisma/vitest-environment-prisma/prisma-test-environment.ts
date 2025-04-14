import { Environment } from "vitest/environments"

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    console.log("prisma setup executou")
    return {
      teardown() {
        console.log("prisma teardown executou")
      },
    }
  },
}