'use client';

import BookNotImplementedMenu from './menus/notimplemented';
import BookPlanets from './menus/books';
import BookPlanetDetail from './menus/book-detail';
import BookPlanetFavorite from './menus/book-favorite';
import { IDictionaryContent } from '../../interfaces/main';

export default function BookDisplayer(props: { menu: IDictionaryContent; detailPage: boolean }) {
  const { menu, detailPage } = props;

  switch (menu.key) {
    case 'Detail':
      return <BookPlanetDetail data={menu} detailPage={detailPage} />;
    case 'Books':
      return <BookPlanets />;
    case 'Favorites':
      return <BookPlanetFavorite />;
    default:
      return <BookNotImplementedMenu />;
  }
}
