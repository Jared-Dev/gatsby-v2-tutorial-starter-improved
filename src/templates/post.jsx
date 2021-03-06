import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO } from 'components';

import '../styles/prism';

const SuggestionBar = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	background: ${(props) => props.theme.colors.white.light};
	box-shadow: ${(props) => props.theme.shadow.suggestion};
`;
const PostSuggestion = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem 3rem 0 3rem;
`;

export const Post = ({ data, pageContext }) => {
	const { next, prev, excerpt } = pageContext;
	const post = data.markdownRemark;
	const {
		html,
		frontmatter: {
			title,
			date,
			cover: {
				childImageSharp: { fluid: image },
			},
		},
	} = post;
	return (
		<Layout>
			<SEO
				title={title}
				description={post.frontmatter.description || excerpt || ' '}
				image={image}
				pathname={post.frontmatter.path}
				article
			/>
			<Header title={title} date={date} cover={image} />
			<Container>
				<Content input={html} />
				<TagsBlock list={post.frontmatter.tags || []} />
			</Container>
			<SuggestionBar>
				<PostSuggestion>
					{prev && (
						<Link to={prev.frontmatter.path}>
							Previous
							<h3>{prev.frontmatter.title}</h3>
						</Link>
					)}
				</PostSuggestion>
				<PostSuggestion>
					{next && (
						<Link to={next.frontmatter.path}>
							Next
							<h3>{next.frontmatter.title}</h3>
						</Link>
					)}
				</PostSuggestion>
			</SuggestionBar>
		</Layout>
	);
};

export default Post;

Post.propTypes = {
	pageContext: PropTypes.shape({
		prev: PropTypes.object,
		next: PropTypes.object,
		excerpt: PropTypes.string,
	}).isRequired,
	data: PropTypes.object.isRequired,
};

export const query = graphql`
	query($pathSlug: String!) {
		markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
			html
			frontmatter {
				date
				title
				tags
				path
				excerpt
				cover {
					childImageSharp {
						fluid(maxWidth: 1920, quality: 90, duotone: { highlight: "#386eee", shadow: "#2323be", opacity: 60 }) {
							...GatsbyImageSharpFluid_withWebp
						}
						resize(width: 1200, quality: 90) {
							src
						}
					}
				}
			}
		}
	}
`;
