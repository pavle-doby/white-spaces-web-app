export enum NavbarButtons {
  CONTACT = 'CONTACT',
  BLOG = 'BLOG',
  ABOUT = 'ABOUT',
  FQAS = "FAQ'S",
  PACKAGES = 'PACKAGES',
}

export const NavbarButtonsArray = [
  NavbarButtons.CONTACT,
  NavbarButtons.BLOG,
  NavbarButtons.ABOUT,
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
