# Typography Mixins Usage Guide

This guide explains how to use the typography mixins in your SCSS files.

## Importing

```scss
@import './stories/styles/typography-mixins';
```

## Desktop Typography Mixins

### Display Styles
Use for large, eye-catching headlines with Questa font in italic style.

```scss
.hero-title {
  @include typography-desktop-display-xl;
  // font-family: Questa, 'Times New Roman', Times, serif
  // font-weight: 500 (Medium)
  // font-style: italic
  // font-size: 104px
  // line-height: 104px
}
```

Available sizes:
- `@include typography-desktop-display-xl;` - 104px
- `@include typography-desktop-display-lg;` - 80px
- `@include typography-desktop-display-md;` - 64px
- `@include typography-desktop-display-sm;` - 48px
- `@include typography-desktop-display-xs;` - 40px

### Headline Styles
Use for section headings with Questa font in regular style.

```scss
.section-heading {
  @include typography-desktop-headline-lg;
  // font-family: Questa, 'Times New Roman', Times, serif
  // font-weight: 400
  // font-size: 32px
  // line-height: 36px
}
```

Available sizes:
- `@include typography-desktop-headline-xl;` - 36px
- `@include typography-desktop-headline-lg;` - 32px
- `@include typography-desktop-headline-md;` - 28px
- `@include typography-desktop-headline-sm;` - 24px

### Body Text Styles
Use for body copy with Lexend font.

```scss
.body-text {
  @include typography-desktop-text-lg-regular;
  // font-family: Lexend, Arial, Helvetica, sans-serif
  // font-weight: 400
  // font-size: 18px
  // line-height: 150%
}

.emphasis-text {
  @include typography-desktop-text-lg-bold;
}

.link-text {
  @include typography-desktop-text-lg-underline;
}
```

Available sizes with variants (regular, bold, underline):
- `@include typography-desktop-text-xl-{variant};` - 20px
- `@include typography-desktop-text-lg-{variant};` - 18px
- `@include typography-desktop-text-md-{variant};` - 16px
- `@include typography-desktop-text-sm-{variant};` - 14px

### Price Styles
Use for pricing with Lexend font.

```scss
.current-price {
  @include typography-desktop-price-lg;
}

.original-price {
  @include typography-desktop-price-lg-strikethrough;
}
```

Available sizes:
- `@include typography-desktop-price-lg;` / `-strikethrough` - 32px
- `@include typography-desktop-price-md;` / `-strikethrough` - 24px
- `@include typography-desktop-price-sm;` / `-strikethrough` - 18px

### Other Styles

```scss
// Call-to-action buttons
.button {
  @include typography-desktop-cta-md;
  // font-size: 16px, line-height: 100%
}

// Category labels, tags
.category-label {
  @include typography-desktop-eyebrow;
  // font-size: 14px, uppercase, 2% letter-spacing
}
```

## Mobile Typography Mixins

Use the same pattern but with `-mobile-` prefix:

```scss
.hero-title {
  @include typography-mobile-display-xl;
  
  @media (min-width: 768px) {
    @include typography-desktop-display-xl;
  }
}
```

Available mobile mixins:
- `@include typography-mobile-display-{xl|lg|md|sm|xs};`
- `@include typography-mobile-headline-{xl|lg|md|sm};`
- `@include typography-mobile-text-{xl|lg|md|sm}-{regular|bold|underline};`
- `@include typography-mobile-price-{lg|md|sm};` / `-strikethrough`
- `@include typography-mobile-cta-{md|sm};`
- `@include typography-mobile-eyebrow;`

## Font Weights Reference

- **Regular**: 400
- **Medium**: 500
- **Bold**: 700

## Font Families

- **Primary (Questa)**: Display and headline text
- **Secondary (Lexend)**: Body text, prices, CTAs

## Example Component

```scss
@import './stories/styles/typography-mixins';

.product-card {
  .product-name {
    @include typography-mobile-headline-sm;
    
    @media (min-width: 768px) {
      @include typography-desktop-headline-md;
    }
  }
  
  .product-description {
    @include typography-mobile-text-sm-regular;
    
    @media (min-width: 768px) {
      @include typography-desktop-text-md-regular;
    }
  }
  
  .price {
    @include typography-mobile-price-md;
    
    @media (min-width: 768px) {
      @include typography-desktop-price-lg;
    }
  }
  
  .cta-button {
    @include typography-mobile-cta-sm;
    
    @media (min-width: 768px) {
      @include typography-desktop-cta-md;
    }
  }
}
```
