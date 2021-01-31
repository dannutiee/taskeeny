import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { useGetTagsQuery, Tag as TagType } from "../../graphql";
import { TagsContext } from "../../contexts/tags";

type Tag = Omit<TagType, "id">;

interface CategoriesListContainerProps {
  tags: Tag[];
}

export const CategoriesListContainer: React.FC = () => {
  const { data, error, loading } = useGetTagsQuery();

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return null;
  }

  return <CategoriesListComponent tags={data?.user.tags || []} />;
};

const CategoriesListComponent: React.FC<CategoriesListContainerProps> = ({
  tags,
}) => {
  const tagsContext = useContext(TagsContext);

  useEffect(() => {
    tagsContext.resetTags(tags);
  }, [tags]);

  console.log("tagsContext", tagsContext);
  console.log("tags", tags);
  //TODO finish this component
  return (
    <div>
      <SectionTitle>All Categories</SectionTitle>
      <CategoriesWrapper>
        {tags.map((tag, index) => (
          <SingleCategory key={index} color={tag.color}>
            {tag.name}
          </SingleCategory>
        ))}
      </CategoriesWrapper>
    </div>
  );
};

export const CategoriesList = CategoriesListContainer;

const CategoriesWrapper = styled.div`
  margin: 25px 0;
`;

const SingleCategory = styled.div`
  height: 20px;
  padding: 5px 20px;
  width: fit-content;
  border: 1px solid;
  border-radius: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  color: ${(p) => p.color};
  border-color: ${(p) => p.color};
`;

const SectionTitle = styled.div`
  font-family: ${(p) => p.theme.categories.titleFont};
  font-weight: ${(p) => p.theme.categories.titleWeight};
  font-size: ${(p) => p.theme.categories.titleSize};
`;
