import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;

export const useAppQueryCliente = useQueryClient;
export const useAppQuery = useQuery;
export const useAppMutation = useMutation;

export const useAppNavigate = useNavigate
export const useAppLocation = useLocation