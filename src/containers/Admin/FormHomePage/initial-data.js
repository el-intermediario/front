import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "Nota Destacada",
      children: [
        {
          type: COLUMN,
          id: "Nota",
          children: []
        },
        {
          type: COLUMN,
          id: "Publicidad",
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "trending",
      children: [
        {
          type: COLUMN,
          id: "trending0",
          children: []
        },
        {
          type: COLUMN,
          id: "trending1",
          children: []
        },
        {
          type: COLUMN,
          id: "trending2",
          children: []
        },
        {
          type: COLUMN,
          id: "trending3",
          children: []
        }
      ]
    },
    {
      type: ROW,
      id: "corona",
      children: [
        {
          type: COLUMN,
          id: "corona0",
          children: []
        },
        {
          type: COLUMN,
          id: "corona1",
          children: []
        },
        {
          type: COLUMN,
          id: "corona2",
          children: []
        }
      ]
    },
    {
      type: ROW,
      id: "multiple",
      children: [
        {
          type: COLUMN,
          id: "multiple0",
          children: []
        },
        {
          type: COLUMN,
          id: "multiple1",
          children: []
        },
        {
          type: COLUMN,
          id: "multiple2",
          children: []
        }
      ]
    },
    {
      type: ROW,
      id: "topic",
      children: [
        {
          type: COLUMN,
          id: "topic0",
          children: []
        },
        {
          type: COLUMN,
          id: "topic1",
          children: []
        },
        {
          type: COLUMN,
          id: "topic2",
          children: []
        }
      ]
    },
    {
      type: ROW,
      id: "videos",
      children: [
        {
          type: COLUMN,
          id: "column0",
          children: []
        },
        {
          type: COLUMN,
          id: "column1",
          children: []
        },
        {
          type: COLUMN,
          id: "column2",
          children: []
        }
      ]
    },
  ],
  components: {
    component0: { id: "component0", type: "input", content: "Some input" },
    component1: { id: "component1", type: "image", content: "Some image" },
    component2: { id: "component2", type: "email", content: "Some email" },
    component3: { id: "component3", type: "name", content: "Some name" },
    component4: { id: "component4", type: "phone", content: "Some phone" }
  }
};

export default initialData;
