# Папа-путешественник: визуальная концепция

## Статус

Это первая рабочая концепция мультяшной версии папы для сцен пути. Она фиксирует направление внешности и одежды, но ещё не является финальным игровым спрайтом.

Исходные фотографии: `Faces/Papa_1.jpg` и `Faces/Papa_2.jpeg`.

## Визуальные якоря

- короткие аккуратные тёмно-русые волосы;
- светлые серо-голубые глаза и прямые брови;
- прямой нос, широкая нижняя часть лица и взрослая линия челюсти;
- спокойное, собранное и доброжелательное выражение;
- компактная, но явно взрослая атлетичная фигура с пропорцией около 1:4,3.

## Постоянный костюм

- тёмно-бирюзовая лёгкая куртка;
- сливочный хенли;
- небольшой охристо-золотой шарф;
- тёмно-синие походные брюки;
- коричневые треккинговые ботинки;
- компактный коралловый рюкзак.

Бирюзовая куртка и охристый шарф служат постоянными цветовыми маркерами во всех локациях. Спортивное снаряжение может меняться, но эти акценты нужно сохранять.

## Файлы

- `papa-traveler-concept-v1.png` — эталон лица, палитры и одежды;
- `papa-traveler-walk-cycle-v1.png` — первая шестифазная визуализация цикла ходьбы;
- `papa-traveler-walk-cycle-v2.png` — уточнённый цикл с различимыми фазами contact, down, passing и up;
- `public/characters/hero-walk-v1.png` — игровой спрайт-лист: `2172 × 724 px`, шесть равных кадров по `362 × 724 px`.

## Перед игровым экспортом

1. Утвердить лицо, степень мультяшности и базовый костюм.
2. Проверить цикл в размере 35–45% высоты viewport и с длительностью 650–800 ms.
3. При финальной оптимизации вынести контактную тень в отдельный ассет.
4. После ходьбы создать отдельные циклы лыж, плавания, велосипеда и бега.

## Краткий production prompt

> Six equal right-facing full-body frames of the same recognizable adult papa-traveler, one horizontal row, transparent background, identical scale and baseline, distinct contact/down/passing/up/opposite-contact/opposite-passing poses. Hand-painted 2D storybook sprite with simplified gouache shapes, dark teal outline, teal jacket, cream henley, ochre scarf, navy trousers, brown trail shoes and coral backpack. Adult athletic proportions, clear silhouette, complete uncropped limbs and shadows, no text or scenery.
