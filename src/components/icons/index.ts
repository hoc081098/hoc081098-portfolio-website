import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  MediumLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react/ssr'

export const socialIconsMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  medium: MediumLogoIcon,
  email: EnvelopeSimpleIcon,
}
