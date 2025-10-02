import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'

type Props = {
    defaultColorScheme?: 'light' | 'dark'
}

export const useColorScheme = ({ defaultColorScheme = 'light' }: Props) => {
    const { colorScheme, setColorScheme } = useMantineColorScheme()

    const computedColorScheme = useComputedColorScheme(defaultColorScheme)

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
    }

    return { colorScheme, toggleColorScheme }
}
