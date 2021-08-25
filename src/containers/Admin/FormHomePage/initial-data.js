import shortid from "shortid";
import { ROW, COLUMN } from "./constants";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "Notas Destacadas",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "Notas Destacadas",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "Notas Destacadas",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "Notas Destacadas",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "corona",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
          children: []
        },
      ]
    },
    {
      type: ROW,
      id: "multiple",
      children: [
        {
          type: COLUMN,
          id: shortid.generate(),
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
          id: shortid.generate(),
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
  },
  bricks: [
    {
      typeId: 'urgente',
      component: {
        type: 'Ultimo momento',
      },
      type: 'sidebarItem'
    },
    {
      typeId: 'videos',
      component: {
        type: 'Videos',
      },
      type: 'sidebarItem'
    },
    {
      typeId: 'corona_virus',
      component: {
        type: 'Corona virus',
      },
      type: 'sidebarItem'
    },
    {
      typeId: 'publicidad_350',
      component: {
        type: 'Publicidad 350 x 292',
      },
      type: 'sidebarItem'
    },
    {
      typeId: 'publicidad_728',
      component: {
        type: 'Publicidad 728 x 90',
      },
      type: 'sidebarItem'
    }
  ]
};

export default initialData;
