import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	data: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormOpen, setOpenForm] = useState(false);
	const [formData, setFormData] = useState(defaultArticleState);

	function openForm() {
		setOpenForm(!isFormOpen);
	}

	const sideBarRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: sideBarRef,
		onClose: () => setOpenForm(false),
	});

	useEffect(() => {
		function closeByEsc(event: KeyboardEvent) {
			if (event.key === 'Escape') setOpenForm(false);
		}

		document.addEventListener('keydown', closeByEsc);

		return () => {
			document.removeEventListener('keydown', closeByEsc);
		};
	}, [isFormOpen]);

	function handleArticleParams(option: OptionType, key: string) {
		setFormData({ ...formData, [key]: option });
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		props.data(formData);
		setOpenForm(false);
	}

	function handleReset() {
		props.data(defaultArticleState);
		setFormData(defaultArticleState);
	}

	return (
		<>
			<div ref={sideBarRef}>
				<ArrowButton isOpen={isFormOpen} openSideBar={openForm} />
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text
							as='h2'
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase
							dynamicLite>
							Задайте параметры
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formData.fontFamilyOption}
							onChange={(option) =>
								handleArticleParams(option, 'fontFamilyOption')
							}
						/>

						<RadioGroup
							name='fontsize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formData.fontSizeOption}
							onChange={(option) =>
								handleArticleParams(option, 'fontSizeOption')
							}
						/>

						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formData.fontColor}
							onChange={(option) => handleArticleParams(option, 'fontColor')}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formData.backgroundColor}
							onChange={(option) =>
								handleArticleParams(option, 'backgroundColor')
							}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formData.contentWidth}
							onChange={(option) => handleArticleParams(option, 'contentWidth')}
						/>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
