import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { useGetTagsQuery, Tag as TagType } from "../../graphql";
import { TagsContext } from "../../contexts/tags";
import {
  useUpdateTagMutation,
  useSetAllTagsVisibleMutation,
  GetTagsDocument,
} from "../../graphql/__generated__/typeDefs";

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

  const [
    updateTagMutation,
    { error: updateError, data: updateData, loading: updateLoading },
  ] = useUpdateTagMutation({
    refetchQueries: [{ query: GetTagsDocument }],
  });

  const [
    setAllTagsVisibleMutation,
    { error: setAllerror, data: setAllData, loading: setAllLoading },
  ] = useSetAllTagsVisibleMutation({
    refetchQueries: [{ query: GetTagsDocument }],
  });

  const updateTagStatus = async (
    name: string,
    isActive: boolean
  ): Promise<void> => {
    await updateTagMutation({
      variables: {
        input: {
          name,
          isActive,
        },
      },
    });
  };

  const setAllTagsActive = async (): Promise<void> => {
    await setAllTagsVisibleMutation();
  };

  const onCategoryClick = (tagName: string, isActive: boolean) => {
    updateTagStatus(tagName, !isActive);
    // updateTagStatus()
  };

  const onShowAllClick = () => {
    setAllTagsActive();
  };

  console.log("tagsContext", tagsContext);
  console.log("tags", tags);
  //TODO finish this component
  return (
    <CategoriesWrapper>
      <SectionTitle>
        Categories
        <ShowAll onClick={onShowAllClick}>
          Set All Visible
          <Icon className="material-icons-outlined">visibility</Icon>
        </ShowAll>
      </SectionTitle>
      <Scrollable>
        <div>
          {tags.map((tag, index) => (
            <SingleCategory
              key={index}
              color={tag.color}
              disabled={!tag.isActive}
              onClick={() => onCategoryClick(tag.name, tag.isActive)}
            >
              {tag.name}
            </SingleCategory>
          ))}
        </div>
      </Scrollable>
    </CategoriesWrapper>
  );
};

export const CategoriesList = CategoriesListContainer;

interface SingleCategoryProps {
  color: string;
  disabled: boolean;
}

const SingleCategory = styled.div<SingleCategoryProps>`
  height: 20px;
  padding: 5px 20px;
  width: fit-content;
  border: 1px solid;
  border-radius: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  color: ${(p) => (p.disabled ? p.theme.categories.disabled : p.color)};
  border-color: ${(p) => (p.disabled ? p.theme.categories.disabled : p.color)};
`;

const SectionTitle = styled.div`
  margin-bottom: 20px;
  color: ${(p) => p.theme.categories.color};
  font-family: ${(p) => p.theme.categories.titleFont};
  font-weight: ${(p) => p.theme.categories.titleWeight};
  font-size: ${(p) => p.theme.categories.titleSize};
`;

const CategoriesWrapper = styled.div`
  height: calc(100% - 260px);
`;

const Scrollable = styled.div`
  height: calc(100% - 100px);
  overflow: scroll;
`;

const ShowAll = styled.span`
  margin-top: 3px;
  display: block;
  font-weight: 100;
  cursor: pointer;
  display: flex;
  color: ${(p) => p.theme.font.emphasisColor};
  font-size: ${(p) => p.theme.font.size.small};
`;

const Icon = styled.span`
  font-weight: normal;
  font-size: ${(p) => p.theme.font.size.medium};
  margin-left: 7px;
`;
