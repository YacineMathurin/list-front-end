import type { Meta, StoryObj } from "@storybook/react";
import imageFile from "./assets/1760x644_Finance_Keynumbers_2017_40ruedeSevres_CoursdHonneur.jpg";
import { Card } from "../components/molecules/card";

const meta = {
  title: "Custom/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Top Gun",
    description: "A super cool movie",
    alt: "Top gun thumbnail",
    imageSrc: imageFile,
    onButtonClick: () => {},
  },
};
