import { ActionIcon } from '@mantine/core'
import { useColorScheme } from '../hooks/useColorScheme';
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import type { FC } from 'react';

type Props = {
  is_day: number;
}

const ThemeToggleButton: FC<Props> = ({
  is_day
}) => {
    const {colorScheme, toggleColorScheme} = useColorScheme({});
  return (
    <ActionIcon onClick={toggleColorScheme} size="lg">
        {colorScheme === 'dark' ? <FiSun /> : <FiMoon />}
    </ActionIcon>
  )
}

export default ThemeToggleButton