import { chakra, theme, useColorModeValue, useTheme } from '@chakra-ui/react';
import { useStyleConfig, ThemingProps } from '@chakra-ui/react';
import { RouteParams } from 'atomic-router';
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
export { AtomicLink, AtomicButton };

const AtomicButton = chakra<TLink, LinkStyledProps>(Link, {
  shouldForwardProp: (prop) => ['to', 'params', 'query', 'children'].includes(prop),
  baseStyle: (props) => {
    const text = useColorModeValue('gray.800', 'white');
    const textHover = useColorModeValue('gray.600', 'white');
    const _theme = useTheme();
    const isInline = (props as unknown as LinkStyledProps).inline;
    console.log(_theme);
    return _theme.components.Button.baseStyle;
    // textDecorationLine: isInline ? 'underline' : 'none',
    // border: '2px solid',
    // borderColor: text,
    // color: isInline ? 'blue.500' : text,
    // _hover: {
    //   textDecorationLine: 'underline',
    //   color: isInline ? 'blue.300' : textHover,
    // },
  },
});
