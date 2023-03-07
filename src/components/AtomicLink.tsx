import { Button, ButtonProps, chakra, theme, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useStyleConfig, ThemingProps } from '@chakra-ui/react';
import { RouteInstance, RouteParams } from 'atomic-router';
import { Link, type LinkProps } from 'atomic-router-react';

// const AtomicThemingProps = useStyleConfig('Button');

type LinkStyledProps = LinkProps<RouteParams> & ThemingProps<'Link'> & { inline?: boolean };
type ButtonStyledProps = LinkProps<RouteParams> & ThemingProps<'Button'>;
type TLink = typeof Link;

const AtomicLink = chakra<TLink, LinkStyledProps>(Link, {
  shouldForwardProp: (prop) => ['to', 'params', 'query', 'children', 'inline'].includes(prop),
  baseStyle: (props) => {
    const text = useColorModeValue('gray.800', 'white');
    const textHover = useColorModeValue('gray.600', 'white');
    return {
      textDecorationLine: (props as unknown as LinkStyledProps).inline ? 'underline' : 'none',
      color: (props as unknown as LinkStyledProps).inline ? 'blue.500' : text,
      _hover: {
        textDecorationLine: 'underline',
        color: (props as unknown as LinkStyledProps).inline ? 'blue.300' : textHover,
      },
    };
  },
});
export { AtomicLink };
