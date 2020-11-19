export enum NavbarButtons {
  CONTACT = 'CONTACT',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  FQAS = "FAQ'S",
  PACKAGES = 'PACKAGES',
}

export const NavbarButtonsArray = [
  NavbarButtons.CONTACT,
  NavbarButtons.ABOUT,
  NavbarButtons.BLOG,
  NavbarButtons.FQAS,
  NavbarButtons.PACKAGES,
];

export const mapNBArrayToObject = (
  arr: NavbarButtons[]
): Record<NavbarButtons, boolean> => {
  let obj: Record<NavbarButtons, boolean> = {} as any;

  arr.forEach((btn) => {
    obj[btn] = false;
  });

  return obj;
};

export const NavBtnsInitStateObj: Record<
  NavbarButtons,
  boolean
> = mapNBArrayToObject(NavbarButtonsArray);
