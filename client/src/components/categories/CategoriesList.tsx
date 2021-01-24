import React, { useContext } from "react";
import styled from "styled-components";

import { useGetTagsQuery, Tag as TagType } from "../../graphql";
import { AuthContext } from "../../contexts/auth";

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
  console.log("tags", tags);
  //TODO finish this component
  return (
    <div>
      <SectionTitle>All Categories</SectionTitle>
      {tags.map((tag, index) => (
        <div key={index}>{tag.name}</div>
      ))}
    </div>
  );
};

export const CategoriesList = CategoriesListContainer;

const SectionTitle = styled.div`
  font-family: ${(p) => p.theme.categories.titleFont};
  font-weight: ${(p) => p.theme.categories.titleWeight};
  font-size: ${(p) => p.theme.categories.titleSize};
`;
