'use client';

import BookNotImplementedMenu from './menus/notimplemented';
import BookPlanets from './menus/books';
import BookPlanetDetail from './menus/book-detail';
import BookPlanetFavorite from './menus/book-favorite';
import { IDictionaryContent } from '../../interfaces/main';

export default function BookDisplayer(props: { menu: IDictionaryContent }) {
  const { menu } = props;

  switch (menu.key) {
    case 'Detail':
      return <BookPlanetDetail data={menu} />;
    case 'Books':
      return <BookPlanets />;
    case 'Favorites':
      return <BookPlanetFavorite data={menu} />;
    default:
      return <BookNotImplementedMenu />;
  }
}
