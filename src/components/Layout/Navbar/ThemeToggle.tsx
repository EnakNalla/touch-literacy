import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeToggle = () => {
    const current = theme === 'system' ? systemTheme : theme;

    if (current === 'dark') {
      return (
        <BsFillSunFill
          color="yellow"
          role="button"
          onClick={() => setTheme('light')}
          size="20"
          className="mr-2"
        />
      );
    } else {
      return (
        <BsFillMoonFill
          color="gray"
          role="button"
          onClick={() => setTheme('dark')}
          size="20"
          className="mr-2"
        />
      );
    }
  };

  if (!mounted) return null;

  return <div className="mx-4">{renderThemeToggle()}</div>;
};

export default ThemeToggle;
