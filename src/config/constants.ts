import { FlexAlignType, KeyboardType } from 'react-native';

type Position = 'absolute' | 'relative' | undefined;
type Justify = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | undefined;
type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
type FontStyle = 'normal' | 'italic';
type TextAlign = 'center' | 'auto' | 'left' | 'right' | undefined;

export const styleConstants = {
    position: {
        ABSOLUTE: 'absolute' as Position,
        RELATIVE: 'relative' as Position
    },
    flexAlign: {
        CENTER: 'center' as FlexAlignType,
        STRETCH: 'stretch' as FlexAlignType,
        START: 'flex-start' as FlexAlignType,
        END: 'flex-end' as FlexAlignType
    },
    flexJustify: {
        CENTER: 'center' as Justify,
        END: 'flex-end' as Justify,
        START: 'flex-start' as Justify,
        SPACE_BETWEEN: 'space-between' as Justify,
        SPACE_AROUND: 'space-around' as Justify
    },
    flexDirection: {
        ROW: 'row' as Direction,
        COLUMN: 'column' as Direction
    },
    fontStyle: {
        NORMAL: 'normal' as FontStyle,
        ITALIC: 'italic' as FontStyle
    },
    fontWeight: {
        LIGHT: '300',
        NORMAL: '400',
        SEMI_BOLD: '500',
        BOLD: '700'
    },
    fontSize: {
        SMALL: 12,
        DEFAULT: 14,
        MEDIUM: 16,
        LARGE: 18,
        X_LARGE: 22,
        XX_LARGE: 24
    },
    textAlign: {
        AUTO: 'auto' as TextAlign,
        LEFT: 'left' as TextAlign,
        CENTER: 'center' as TextAlign,
        RIGHT: 'right' as TextAlign,
        JUSTIFY: 'justify' as TextAlign
    },
    textDecoration: {
        NONE: 'none',
        UNDERLINE: 'underline',
        LINE_THROUGH: 'line-through',
        UNDERLINE_LINE_THROUGH: 'underline line-through'
    },
    fontFamily: 'Helvetica'
};

type DimensionsParameter = 'window' | 'screen';

export const rnAPIParams = {
    dimensions: {
        WINDOW: 'window' as DimensionsParameter,
        SCREEN: 'screen' as DimensionsParameter
    },
    platform: {
        ANDROID: 'android',
        IOS: 'ios'
    }
};

type KeyboardAvoidingViewBehaviorParameter = 'padding' | 'height' | 'position' | undefined;
type ResizeMode = 'cover' | 'contain' | 'stretch' | 'center' | 'repeat' | undefined;
type PointerEvents = 'none' | 'auto' | 'box-none' | 'box-only' | undefined;
type ActivityIndicatorSize = number | 'small' | 'large' | undefined;
type AutoCapitalize = 'none' | 'sentences' | 'words' | 'characters';

export const rnComponentProps = {
    keyboardAvoidingView: {
        behavior: {
            PADDING: 'padding' as KeyboardAvoidingViewBehaviorParameter,
            HEIGHT: 'height' as KeyboardAvoidingViewBehaviorParameter,
            POSITION: 'position' as KeyboardAvoidingViewBehaviorParameter
        }
    },
    image: {
        resizeMode: {
            COVER: 'cover' as ResizeMode,
            CONTAIN: 'contain' as ResizeMode,
            STRETCH: 'stretch' as ResizeMode,
            REPEAT: 'repeat' as ResizeMode,
            CENTER: 'center' as ResizeMode
        }
    },
    view: {
        pointerEvents: {
            NONE: 'none' as PointerEvents,
            BOX_NONE: 'box-none' as PointerEvents,
            BOX_ONLY: 'box-only' as PointerEvents
        }
    },
    activityIndicator: {
        size: {
            SMALL: 'small' as ActivityIndicatorSize,
            LARGE: 'large' as ActivityIndicatorSize
        }
    },
    textInput: {
        keyboardType: {
            EMAIL_ADDRESS: 'email-address' as KeyboardType,
            NUMERIC: 'numeric' as KeyboardType,
            PHONE_PAD: 'phone-pad' as KeyboardType
        },
        autoCapitalize: {
            NONE: 'none' as AutoCapitalize,
            SENTENCES: 'sentences' as AutoCapitalize,
            WORDS: 'words' as AutoCapitalize,
            CHARACTERS: 'characters' as AutoCapitalize
        }
    }
};

type HeaderMode = 'screen' | 'float' | 'none' | undefined;

export const reactNavigationParams = {
    headerMode: {
        SCREEN: 'screen' as HeaderMode,
        FLOAT: 'float' as HeaderMode,
        NONE: 'none' as HeaderMode
    }
};
